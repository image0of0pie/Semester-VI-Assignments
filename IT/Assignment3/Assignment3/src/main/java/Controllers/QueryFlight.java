package Controllers;
import Models.QueryManagerDao;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
@WebServlet(urlPatterns = "/queryflight")
public class QueryFlight extends HttpServlet {
    public static Statement stat;
    @Override
    public void init() throws ServletException {
        super.init();
        try{
            stat=((Connection) getServletContext().getAttribute("connection")).createStatement();
            stat.executeQuery("USE TICKET");
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
        QueryManagerDao queryManagerDao =new QueryManagerDao(stat,req);
        try {
            out.println(queryManagerDao.getQueryResult());
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
