package Models;

import org.json.JSONArray;
import org.json.JSONObject;
import javax.servlet.http.HttpServletRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class QueryManager {
    public Statement stat;
    public HttpServletRequest req;
    public List<Schedule> scheduleList;
    public QueryManager(Statement stat, HttpServletRequest req){
        this.stat=stat;
        this.req=req;
        String query=generateQuery();
        this.scheduleList=new ArrayList<>();
        try {
            ResultSet rs = stat.executeQuery(query);
            while (rs.next()){
                Schedule schedule=new Schedule(rs.getInt("id"),rs.getString("arrivalCity"),rs.getString("departureCity"),rs.getInt("legs"),rs.getInt("cost"),rs.getInt("duration"),rs.getString("time"));
                this.scheduleList.add(schedule);
            }
        }catch (Exception e){
            System.out.println(e.toString());
        }
    }
    public JSONArray getQueryResult() throws SQLException {
        JSONArray ans=new JSONArray();
        for(Schedule schedule:this.scheduleList){
            ResultSet checkRes= stat.executeQuery("select * from Deals where scheduleId = "+schedule.getId());
            if(!checkRes.next()){
                schedule.setOnSale("");
            }else{
                schedule.setOnSale("On Sale");
            }
            JSONObject schedulee=schedule.toJSON();
            ans.put(schedulee);
        }
        return ans;
    }
    private String generateQuery(){
        String arrivalCity=req.getAttribute("arrivalCity").toString();
        String departureCity=req.getAttribute("departureCity").toString();
        String time=req.getAttribute("time").toString();
        String query="select * from Schedule ";
        boolean searchParam=false;
        if(!arrivalCity.equals("")){
            searchParam=true;
            query=query+" WHERE arrivalCity REGEXP '"+arrivalCity+"+' ";
        }
        if(!departureCity.equals("")){
            if(searchParam){
                query=query+" AND ";
            }else{
                query=query+" WHERE ";
            }
            query=query+" departureCity REGEXP '"+departureCity+"+' ";
            searchParam=true;
        }
        if(!time.equals("")){
            if(searchParam){
                query=query+" AND ";
            }else{
                query=query+" WHERE ";
            }
            query=query+"time = '"+time+"'";
            searchParam=true;
        }
        return query;
    }
}
