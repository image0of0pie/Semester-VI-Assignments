package Controllers;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;
@WebFilter(urlPatterns = "/queryflight")
public class QueryFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String departureCity=(servletRequest).getParameter("departureCity");
        if(departureCity==null){
            servletRequest.setAttribute("departureCity","");
        }else{
            servletRequest.setAttribute("departureCity",departureCity);
        }
        String arrivalCity= servletRequest.getParameter("arrivalCity");
        if(arrivalCity==null){
            servletRequest.setAttribute("arrivalCity","");
        }else{
            servletRequest.setAttribute("arrivalCity",arrivalCity);
        }
        String time=(servletRequest).getParameter("time");
        if(time==null){
            servletRequest.setAttribute("time","");
        }else{
            servletRequest.setAttribute("time",time);
        }
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
