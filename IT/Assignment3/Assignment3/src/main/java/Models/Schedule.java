package Models;

import org.json.JSONObject;

public class Schedule {
    private final int id;
    private final String arrivalCity;
    private final String departureCity;
    private final int legs;
    private final int cost;
    private final int duration;
    private final String time;
    private String onSale;
    Schedule(int id,String arrivalCity,String departureCity,int legs,int cost,int duration,String time){
        this.id=id;
        this.arrivalCity=arrivalCity;
        this.departureCity=departureCity;
        this.legs=legs;
        this.cost=cost;
        this.duration=duration;
        this.time=time;
    }
    public JSONObject toJSON(){
        JSONObject res=new JSONObject();
        try{
            res.put("id",this.id);
            res.put("arrivalCity",this.arrivalCity);
            res.put("departureCity",this.departureCity);
            res.put("legs",this.legs);
            res.put("cost",this.cost);
            res.put("duration",this.duration);
            res.put("time",this.time);
            res.put("sale",this.onSale);
        }catch (Exception e){
            System.err.println(e.toString());
        }
        return  res;
    }

    public void setOnSale(String onSale) {
        this.onSale = onSale;
    }

    public int getId() {
        return id;
    }
}
