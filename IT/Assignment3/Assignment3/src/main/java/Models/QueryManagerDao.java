package Models;
import org.json.JSONArray;
import javax.servlet.http.HttpServletRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
public class QueryManagerDao {
    public Statement stat;
    public HttpServletRequest req;
    public List<Schedule> scheduleList;
    public List<Integer> dealScheduleIdList;
    public QueryManagerDao(Statement stat, HttpServletRequest req){
        this.stat=stat;
        this.req=req;
        String query=generateQuery();
        this.scheduleList=new ArrayList<>();
        this.dealScheduleIdList=new ArrayList<>();
        try {
            ResultSet rs = stat.executeQuery(query);
            while (rs.next()){
                Schedule schedule=new Schedule(rs.getInt("id"),rs.getString("arrivalCity"),rs.getString("departureCity"),rs.getInt("legs"),rs.getInt("cost"),rs.getInt("duration"),rs.getString("time"));
                this.scheduleList.add(schedule);
            }
        }catch (Exception e){
            System.out.println(e.toString());
        }
        try{
            ResultSet rs= stat.executeQuery("select scheduleId from Deals");
            while(rs.next()){
                dealScheduleIdList.add(rs.getInt("scheduleId"));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
    public JSONArray getQueryResult() throws SQLException {
        JSONArray ans=new JSONArray();
        for(Schedule schedule:this.scheduleList){
            if(dealScheduleIdList.contains(schedule.getId())){
                schedule.setOnSale("On Sale");
            }else{
                schedule.setOnSale("");
            }
            ans.put(schedule.toJSON());
        }
        return ans;
    }
    private String generateQuery(){
        String arrivalCity=req.getAttribute("arrivalCity").toString();
        String departureCity=req.getAttribute("departureCity").toString();
        String time=req.getAttribute("time").toString();
        Integer start=(Integer) req.getAttribute("start");
        Integer count=(Integer) req.getAttribute("count");
        String query="select * from Schedule ";
        boolean searchParam=false;
        if(!arrivalCity.equals("")){
            searchParam=true;
            query=query+" WHERE arrivalCity = '"+arrivalCity+"' ";
        }
        if(!departureCity.equals("")){
            if(searchParam){
                query=query+" AND ";
            }else{
                query=query+" WHERE ";
            }
            query=query+" departureCity = '"+departureCity+"' ";
            searchParam=true;
        }
        if(!time.equals("")){
            if(searchParam){
                query=query+" AND ";
            }else{
                query=query+" WHERE ";
            }
            query=query+"time = '"+time+"' ";
        }
        query=query+" limit "+start+" , "+count+" ;";
        return query;
    }
}
