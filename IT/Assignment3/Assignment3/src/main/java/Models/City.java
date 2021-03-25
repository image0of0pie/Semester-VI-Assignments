package Models;
import org.json.JSONObject;
public class City {
    public final String city;
    City(String city){
        this.city=city;
    }
    public JSONObject toJSON(){
        JSONObject res=new JSONObject();
        try{
            res.put("city",this.city);
        }catch (Exception e){
            System.err.println(e.toString());
        }
        return res;
    }

    public String getCity() {
        return city;
    }
}
