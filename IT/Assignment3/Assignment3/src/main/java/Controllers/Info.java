package Controllers;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Statement;
import Models.CityManager;
@WebServlet(urlPatterns = "/info")
public class Info extends HttpServlet {
    public static Statement stat;
    @Override
    public void init() throws ServletException {
        super.init();
        try{
            stat=(Statement) getServletContext().getAttribute("databaseStatement");
        }catch (Exception e) {
            System.err.println(e.toString());
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        PrintWriter out= resp.getWriter();
        String clientOrigin = req.getHeader("origin");
        resp.setHeader("Access-Control-Allow-Origin", clientOrigin);
        CityManager cityManager=new CityManager(stat);
        out.println(cityManager.getCities());
    }
}
