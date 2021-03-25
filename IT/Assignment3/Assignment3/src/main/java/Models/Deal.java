package Models;
import org.json.JSONObject;

import java.time.LocalDateTime;

public class Deal {
    public final String arrivalCity;
    public final String departureCity;
    public final int perc;
    public final int cash;
    public final String time;
    public final int scheduleId;
    public final String expiresAt;
    Deal(String arrivalCity, String departureCity, int perc, int cash, String time, int scheduleId,String expiresAt){
        this.arrivalCity=arrivalCity;
        this.departureCity=departureCity;
        this.perc=perc;
        this.cash=cash;
        this.time=time;
        this.scheduleId=scheduleId;
        this.expiresAt=expiresAt;
    }
    public boolean isExpired(){
        return LocalDateTime.now().isAfter(LocalDateTime.parse(this.expiresAt));
    }
    public JSONObject toJSON() {
        JSONObject res=new JSONObject();
        try {
            res.put("arrivalCity",this.arrivalCity);
            res.put("departureCity",this.departureCity);
            res.put("perc",this.perc);
            res.put("cash",this.cash);
            res.put("scheduleId",this.scheduleId);
            res.put("expiresAt",this.expiresAt);
            res.put("time",this.time);
        }catch (Exception e){
            System.err.println(e.toString());
        }
        return res;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public String getTime() {
        return time;
    }

    public int getCash() {
        return cash;
    }

    public int getPerc() {
        return perc;
    }

    public String getArrivalCity() {
        return arrivalCity;
    }

    public int getScheduleId() {
        return scheduleId;
    }

    public String getExpiresAt() {
        return expiresAt;
    }
}
