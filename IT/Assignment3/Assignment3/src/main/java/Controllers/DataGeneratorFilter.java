package Controllers;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;
@WebFilter(urlPatterns = "/setdata")
public class DataGeneratorFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        if(servletRequest.getParameter("privatekey")==null){
            servletRequest.setAttribute("privatekey","");
        }else{
            servletRequest.setAttribute("privatekey",servletRequest.getParameter("privatekey"));
        }
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
