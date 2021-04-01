package Controllers;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;
import java.util.Objects;

@WebFilter(urlPatterns = "/queryflight")
public class QueryFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String departureCity=(servletRequest).getParameter("departureCity");
        servletRequest.setAttribute("departureCity", Objects.requireNonNullElse(departureCity, ""));
        String start=(servletRequest).getParameter("start");
        if(start==null){
            servletRequest.setAttribute("start",0);
        }
        else{
            servletRequest.setAttribute("start",Integer.valueOf(start));
        }
        String count=(servletRequest).getParameter("count");
        if(count==null){
            servletRequest.setAttribute("count",10);
        }
        else{
            servletRequest.setAttribute("count",Integer.valueOf(count));
        }
        String arrivalCity= servletRequest.getParameter("arrivalCity");
        servletRequest.setAttribute("arrivalCity", Objects.requireNonNullElse(arrivalCity, ""));
        String time=(servletRequest).getParameter("time");
        servletRequest.setAttribute("time", Objects.requireNonNullElse(time, ""));
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
