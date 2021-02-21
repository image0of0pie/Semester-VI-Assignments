import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class DataBase implements Serializable {
    HashMap<String,HashMap<String,String>> store;
    HashMap<String, Integer> register;
    int numOfManagers;

    public DataBase(int managerNum) {
        this.numOfManagers = managerNum;
        this.store = new HashMap<>();
        this.register = new HashMap<>();
    }


    public String getValue(String key,String name) {
        if(this.isManager(name)){
            String result=null;
            for (Map.Entry<String, HashMap<String,String>> e : this.store.entrySet()){
                if(e.getValue().containsKey(key)){
                    if(result.equals(null))
                        result=e.getValue().get(key);
                    else
                        result=result+" , "+e.getValue().get(key);
                }
            }
            if(result.equals("")){
                return "No result found";
            }else{
                return result;
            }
        }else return this.store.get(name).getOrDefault(key, "No such data found");
    }
    public String setValue(String key, String value,String name) {
        this.store.get(name).put(key,value);
        return "Added Successfully";
    }




    public String authorize(String name){
        String msg="Logged in as guest -- "+name;
        if(this.register.containsKey(name) && this.isManager(name)){
            msg="Logged in as manager -- " +name;
        }else if(!this.register.containsKey(name)) {
            this.register.put(name, 2);
            this.store.put(name,new HashMap<>());
        }
        return msg;
    }
    public String upgradeToManager(String name) {
        if (this.register.containsKey(name) && !this.isManager(name)) {
            this.register.put(name, 1);
            return "Upgraded to manager successfully";
        }else if(this.isManager(name)){
            return "Already registered as a manager";
        }
        else {
            return "Manager limit reached";
        }
    }
    private Boolean isManager(String name){
        if(this.register.get(name)==1){
            return true;
        }else{
            return false;
        }
    }
}
