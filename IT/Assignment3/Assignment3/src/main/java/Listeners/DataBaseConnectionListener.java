package Controllers;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@WebListener
public class DataBaseConnectionListener implements ServletContextListener {
    public static Connection conn;
    public static Statement stat;
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext servletContext=sce.getServletContext();
        try{
            Class.forName(servletContext.getInitParameter("DRIVER_URL"));
            conn = DriverManager.getConnection(servletContext.getInitParameter("DB_URL"),servletContext.getInitParameter("username"),servletContext.getInitParameter("password"));
            stat = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            stat.executeQuery("USE "+servletContext.getInitParameter("DB_NAME"));
            servletContext.setAttribute("databaseStatement",stat);
        }catch (Exception e) {
            System.err.println(e.toString());
        }
    }
}
