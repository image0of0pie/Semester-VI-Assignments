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

public class Deals extends HttpServlet {
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
    public static JSONArray getDeals(){
        JSONArray ans=new JSONArray();
        try {
            ResultSet rs = stat.executeQuery("select * from Deals");
            while (rs.next()){
                JSONObject deal=new JSONObject().put("arrivalCity",rs.getString("arrivalCity")).put("departureCity",rs.getString("departureCity")).put("perc",String.valueOf(rs.getInt("perc"))+"%").put("cash","Rs "+String.valueOf(rs.getInt("cash"))).put("time",rs.getString("time"));
                ans.put(deal);
            }
        }catch (Exception e){
            System.out.println(e.toString());
        }
        return ans;
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        PrintWriter out= resp.getWriter();
        String clientOrigin = req.getHeader("origin");
        resp.setHeader("Access-Control-Allow-Origin", clientOrigin);
        out.println(Deals.getDeals());
    }
}
