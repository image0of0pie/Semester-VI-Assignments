package Controllers;
import java.io.IOException;
import java.sql.*;
import Models.DataGeneratorDao;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet(urlPatterns = "/setdata")
public class DataGenerator extends HttpServlet {
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
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        if(req.getAttribute("privatekey").equals(getServletContext().getInitParameter("privatekey"))) {
            super.doGet(req, resp);
            DataGeneratorDao dataGeneratorDao=new DataGeneratorDao(stat);
            dataGeneratorDao.ResetDatabase();
            System.out.println("Database reset successful");
            dataGeneratorDao.CityGenerator();
            System.out.println("cities generated successfully");
            dataGeneratorDao.ScheduleGenerator();
            System.out.println("schedules generated successfully");
            dataGeneratorDao.DealGenerator();
            resp.getWriter().println("Data Reset Successful");
        }else{
            resp.getWriter().println("Invalid Private Key");
        }
    }
}
