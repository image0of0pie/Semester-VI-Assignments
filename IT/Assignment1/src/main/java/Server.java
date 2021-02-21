import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Server {
    private ServerSocket serverSocket;
    private ExecutorService pool;
    private DataBase db;
    public Server(int port) {

        this.db=new DataBase(10);
        String hostIp="127.0.0.1";
        try {
            this.serverSocket = new ServerSocket(port);
            System.out.println("Server Initiated");
            System.out.println("Ip for server: "+hostIp);
            System.out.println("Port for server: "+String.valueOf(port));
            System.out.println("Available services------------");
            System.out.println("1. 'get <key>' to access value for the key");
            System.out.println("2. 'put <key> <value>' to add or replace value of the key");
            System.out.println("3. 'upgrade <gradation_key> to enroll as a manager");
            System.out.println("-----------------------------------------------------------");
        }catch (Exception e){
            System.err.println(e.toString());
        }


        this.pool= Executors.newCachedThreadPool();

        while(true) {
            try {
                Socket socket = serverSocket.accept();
                this.pool.execute(new ClientHandler(socket,this.db));
            } catch (Exception e) {
                System.err.println(e.toString());
            }
        }
    }


    public static void main(String[] args) {
        new Server(5000);
    }
}



