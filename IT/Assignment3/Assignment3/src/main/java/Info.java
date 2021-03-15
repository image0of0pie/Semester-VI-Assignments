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

import org.json.JSONArray;
import org.json.JSONObject;

public class Info extends HttpServlet {
    public static String DB_URL="jdbc:mysql://localhost:3306";
    public static Connection conn;
    public static Statement stat;
    @Override
    public void init() throws ServletException {
        super.init();
        try{
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(DB_URL,"root","");
            stat = conn.createStatement();
            stat.executeQuery("USE Ticket");
        }catch (Exception e) {
            System.err.println(e.toString());
        }
    }

    public static JSONArray getCities(){
        JSONArray ans=new JSONArray();
        try {
            ResultSet rs = stat.executeQuery("select id,city from City");
            while (rs.next()){
                org.json.JSONObject city=new JSONObject().put("name",rs.getString("city"));
                ans.put(city);
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
        out.println(Info.getCities());
    }
}
