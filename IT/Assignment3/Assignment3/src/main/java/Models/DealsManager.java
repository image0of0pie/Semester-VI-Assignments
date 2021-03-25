package Models;

import org.json.JSONArray;
import org.json.JSONObject;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DealsManager {
    public Statement stat;
    List<Deal> dealsList;
    public void DealGenerator(){
        try {
            this.stat.executeQuery("USE Ticket");
            this.stat.executeUpdate("delete from Deals");
            Random r= new Random();
            ResultSet rs = stat.executeQuery("select * from Schedule order by RAND() limit 20;");
            // for each of 20 schedules get random max cashback and max percoff
            JSONArray deals=new JSONArray();
            while (rs.next()){
                JSONObject deal=new JSONObject();
                deal.put("scheduleId",rs.getString("id"));
                deal.put("arrivalCity",rs.getString("arrivalCity"));
                deal.put("departureCity",rs.getString("departureCity"));
                deal.put("time",rs.getString("time"));
                deal.put("createdAt", LocalDateTime.now().toString());
                deal.put("expiresAt",LocalDateTime.now().plusDays(1).toString());
                int max_perc=r.nextInt(20)+20;
                int max_cashback=r.nextInt(max_perc)*50+800;
                deal.put("perc",max_perc);
                deal.put("cash",max_cashback);
                deals.put(deal);
            }
            for(int i=0;i< deals.length();i++){
                JSONObject deal= deals.getJSONObject(i);
                stat.executeUpdate("insert into Deals (arrivalCity,departureCity,time,cash,perc,scheduleId,createdAt,expiresAt) values ('"+deal.getString("arrivalCity")+"','"+deal.getString("departureCity")+"','"+deal.getString("time")+"',"+deal.getInt("cash")+","+deal.getInt("perc")+",'"+deal.getInt("scheduleId")+"','"+deal.getString("createdAt")+"','"+deal.getString("expiresAt")+"');");
            }
        }catch (Exception e){
            System.err.println(e.toString());
        }
    }
    public DealsManager(Statement stat){
        this.stat=stat;
        this.dealsList=new ArrayList<>();
        try {
            ResultSet rs = stat.executeQuery("select * from Deals");
            int taken=0;
            while(rs.next()){
                taken=1;
                Deal deal=new Deal(rs.getString("arrivalCity"),rs.getString("departureCity"),rs.getInt("perc"),rs.getInt("cash"),rs.getString("time"),rs.getInt("scheduleId"),rs.getString("expiresAt"));
                if(deal.isExpired()){
                    this.DealGenerator();
                    rs = stat.executeQuery("select * from Deals");
                    continue;
                }
                this.dealsList.add(deal);
            }
            if(taken==0){
                this.DealGenerator();
                rs = stat.executeQuery("select * from Deals");
                while(rs.next()){
                    Deal deal=new Deal(rs.getString("arrivalCity"),rs.getString("departureCity"),rs.getInt("perc"),rs.getInt("cash"),rs.getString("time"),rs.getInt("scheduleId"),rs.getString("expiresAt"));
                    if(deal.isExpired()){
                        this.DealGenerator();
                        rs = stat.executeQuery("select * from Deals");
                        continue;
                    }
                    this.dealsList.add(deal);
                }
            }
        }catch (Exception e){
            System.err.println(e.toString());
        }
    }
    public JSONArray getDeals(){
        JSONArray ans=new JSONArray();
        try {
            for(Deal deal:this.dealsList){
                JSONObject deall=deal.toJSON();
                ans.put(deall);
            }
        }catch (Exception e){
            System.out.println(e.toString());
        }
        return ans;
    }
}
