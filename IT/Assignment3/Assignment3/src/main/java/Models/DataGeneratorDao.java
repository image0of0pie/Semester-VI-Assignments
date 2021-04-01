package Models;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DataGeneratorDao {
    public Statement stat;
    public DataGeneratorDao(Statement statement){
        this.stat=statement;
    }
    public void ResetDatabase(){
        try{
            stat.executeUpdate("delete from Deals ;");
            stat.executeUpdate("delete from Schedule;");
            stat.executeUpdate("delete from City;");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
    public void CityGenerator(){
        try {
            List<String> airportCities=new ArrayList<>();
            Document doc = Jsoup.connect("https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm").get();
            Elements tableElements=doc.select("tr");
            for(Element el:tableElements){
                Elements children=el.children();
                if(children.size()==3){
                    airportCities.add(children.get(0).text()+" , "+children.get(1).text()+"("+children.get(2).text()+")");
                }
            }
            for(String city:airportCities){
                if(!city.contains("'")) {
                    stat.executeUpdate("insert into City(city) values ('" + city + "');");
                }
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.toString());
        }
    }
    public void ScheduleGenerator(){
        try {
            ResultSet rs = stat.executeQuery("select city from City");
            JSONArray cities=new JSONArray();
            while (rs.next()){
                cities.put(rs.getString("city"));
            }
            String[] timeList=new String[48];
            for(int i=0;i<24;i++){
                timeList[2*i]= i +":00" ;
                timeList[2*i+1]= i +":30" ;
            }
            Random r =new Random();
            // generate schedules for 10 stations from every city and with random legs and 2 times a day with accordingly cost
            int baseCost=3000,addOnPerLeg=500;
            for(int i=0;i< cities.length();i++){
                System.out.println("Working on: "+i+"/"+cities.length());
                //for every time stamp
                for(String time:timeList){
                    // for 100 stations
                    for(int j=0;j<10;j++) {
                        // select dept city
                        int deptCity = r.nextInt(cities.length());
                        while (deptCity == i) {
                            deptCity = r.nextInt(cities.length());
                        }
                        // get random leg
                        int addLeg=r.nextInt(5);
                        //get duration
                        String duration=String.valueOf(300+30*addLeg);
                        // calculate cost
                        int cost = baseCost+addLeg*addOnPerLeg;
                        stat.executeUpdate("insert into Schedule (arrivalCity,departureCity,legs,cost,duration,time) values ('"+cities.getString(i) +"','"+cities.getString(deptCity)+"',"+ (addLeg + 1) +","+ cost +",'"+duration+"','"+time+"');");
                    }
                }

            }

        }catch (Exception e){
            System.err.println(e.toString());
        }
    }
    public void DealGenerator(){
        String DB_URL="jdbc:mysql://localhost:3306";
        try {

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
}
