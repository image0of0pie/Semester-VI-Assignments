import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.*;
import java.util.Random;

import com.mysql.jdbc.Driver;
import org.json.JSONArray;
import org.json.JSONObject;
public class DataGenerator extends Driver {
    public DataGenerator() throws SQLException {
    }

    public static void CityGenerator(){
        String DB_URL="jdbc:mysql://localhost:3306";
        try {
            Connection conn= DriverManager.getConnection(DB_URL,"root","");
            Statement stat = conn.createStatement();
            URL url = new URL("https://parseapi.back4app.com/classes/india_cities_database?limit=200&order=-population&keys=ascii_name");
            HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
            urlConnection.setRequestProperty("X-Parse-Application-Id", "k9wzhXDJckHtuuKmMEm8hceXoCZMvxN4CTijZOjn"); // This is the fake app's application id
            urlConnection.setRequestProperty("X-Parse-Master-Key", "EpjKI6bUlgkIbOAAUaDKDFj6x2C3AnsZZJqoa4ak"); // This is the fake app's readonly master key
            try {
                BufferedReader reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                StringBuilder stringBuilder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    stringBuilder.append(line);
                }
                JSONObject data = new JSONObject(stringBuilder.toString()); // Here you have the data that you need
                JSONArray results=data.getJSONArray("results");
                stat.executeQuery("USE Ticket");
                for(int i=0;i<results.length();i++){
                    String city=results.getJSONObject(i).get("ascii_name").toString();
                    stat.executeUpdate("insert into City(city) values ('"+city+"');");
                }
                conn.close();
            } finally {
                urlConnection.disconnect();
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.toString());
        }
    }
    public static void ScheduleGenerator(){
        String DB_URL="jdbc:mysql://localhost:3306";
        try {
            Connection conn = DriverManager.getConnection(DB_URL,"root","");
            Statement stat = conn.createStatement();
            stat.executeQuery("USE Ticket");
            ResultSet rs = stat.executeQuery("select city from City");
            JSONArray cities=new JSONArray();
            while (rs.next()){
                cities.put(rs.getString("city"));
            }
            String[] timeList=new String[48];
            for(int i=0;i<24;i++){
                timeList[2*i]=String.valueOf(i)+":00" ;
                timeList[2*i+1]=String.valueOf(i)+":30" ;
            }
            Random r =new Random();
            // generate schedules for 10 stations from every city and with random legs and 2 times a day with accordingly cost
            int baseCost=3000,addOnPerLeg=500;
            for(int i=0;i< cities.length();i++){
                // for 10 stations
                for(int j=0;j<10;j++) {
                    // select dest city
                    int destCity = r.nextInt(cities.length());
                    while (destCity == i) {
                        destCity = r.nextInt(cities.length());
                    }
                    // get random leg
                    int addLeg=r.nextInt(3);
                    //get duration
                    String duration=String.valueOf(300+30*addLeg);
                    // get time
                    String time=timeList[r.nextInt(48)];
                    // calculate cost
                    int cost = baseCost+addLeg*addOnPerLeg;
                    stat.executeUpdate("insert into Schedule (arrivalCity,departureCity,legs,cost,duration,time) values ('"+cities.getString(i) +"','"+cities.getString(destCity)+"',"+String.valueOf(addLeg+1)+","+String.valueOf(cost)+",'"+duration+"','"+time+"');");
                }
            }

        }catch (Exception e){
            System.err.println(e.toString());
        }
    }
    public static void DealGenerator(){
        String DB_URL="jdbc:mysql://localhost:3306";
        try {
            Connection conn = DriverManager.getConnection(DB_URL,"root","");
            Statement stat = conn.createStatement();
            stat.executeQuery("USE Ticket");
            Random r= new Random();
            ResultSet rs = stat.executeQuery("select * from Schedule order by RAND() limit 8;");
            // for each of 8 schedules get random max cashback and max percoff
            JSONArray deals=new JSONArray();
            while (rs.next()){
                JSONObject deal=new JSONObject();
                deal.put("scheduleId",rs.getString("id"));
                deal.put("arrivalCity",rs.getString("arrivalCity"));
                deal.put("departureCity",rs.getString("departureCity"));
                deal.put("time",rs.getString("time"));
                int max_perc=r.nextInt(6)+6;
                int max_cashback=r.nextInt(4)*100+400;
                deal.put("perc",max_perc);
                deal.put("cash",max_cashback);
                deals.put(deal);
            }
            for(int i=0;i< deals.length();i++){
                JSONObject deal= deals.getJSONObject(i);
                stat.executeUpdate("insert into Deals (arrivalCity,departureCity,time,cash,perc,scheduleId) values ('"+deal.getString("arrivalCity")+"','"+deal.getString("departureCity")+"','"+deal.getString("time")+"',"+deal.getInt("cash")+","+deal.getInt("perc")+",'"+deal.getInt("scheduleId")+"');");
            }
        }catch (Exception e){
            System.err.println(e.toString());
        }
    }
    public static void main(String[] args) {
        DataGenerator.CityGenerator();
        DataGenerator.ScheduleGenerator();
        DataGenerator.DealGenerator();
    }
}
