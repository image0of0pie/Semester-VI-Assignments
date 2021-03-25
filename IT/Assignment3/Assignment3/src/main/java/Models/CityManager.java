package Models;

import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CityManager {
    public Statement stat;
    List<City> citiesList;
    public CityManager(Statement stat){
        this.stat=stat;
        this.citiesList=new ArrayList<>();
        try {
            ResultSet rs = stat.executeQuery("select id,city from City");
            while(rs.next()){
                City city=new City(rs.getString("city"));
                this.citiesList.add(city);
            }
        }catch (Exception e){
            System.err.println(e.toString());
        }
    }
    public JSONArray getCities(){
        JSONArray ans=new JSONArray();
        try {
            for(City city:this.citiesList){
                JSONObject cityy= city.toJSON();
                ans.put(cityy);
            }
        }catch (Exception e){
            System.out.println(e.toString());
        }
        return ans;
    }
}
