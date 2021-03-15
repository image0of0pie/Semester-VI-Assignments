import org.json.JSONArray;
import org.json.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class QueryFlight extends HttpServlet {
    public static String DB_URL="jdbc:mysql://localhost:3306";
    public static Connection conn;
    public static Statement stat;
    @Override
    public void init() throws ServletException {
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,"root","");
            stat = conn.createStatement();
            stat.executeQuery("USE Ticket");
        }catch (Exception e) {
            System.err.println(e.toString());
        }
    }
    public static JSONArray getQueryResult(String query){
        JSONArray ans=new JSONArray();
        try {
            ResultSet rs = stat.executeQuery(query);
            while (rs.next()){
                JSONObject deal=new JSONObject().put("arrivalCity",rs.getString("arrivalCity")).put("departureCity",rs.getString("departureCity")).put("cost","Rs "+String.valueOf(rs.getInt("cost"))).put("legs",rs.getInt("legs")).put("time",rs.getString("time")).put("duration",String.valueOf(rs.getInt("duration"))+" mins").put("id",rs.getInt("id"));
                ans.put(deal);
            }
        }catch (Exception e){
            System.out.println(e.toString());
        }
        return ans;
    }
    public static String generateQuery(String arrivalCity,String departureCity,String time){
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
            query=query+"time REGEXP '"+time+"+'";
            searchParam=true;
        }
        return query;
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        PrintWriter out= resp.getWriter();
        String arrivalCity=req.getParameter("arrivalCity")==null?"":req.getParameter("arrivalCity");
        String departureCity=req.getParameter("departureCity")==null?"":req.getParameter("departureCity");
        String time=req.getParameter("time")==null?"":req.getParameter("time");
        String clientOrigin = req.getHeader("origin");
        resp.setHeader("Access-Control-Allow-Origin", clientOrigin);
        out.println(getQueryResult(generateQuery(arrivalCity,departureCity,time)));
    }
}
