import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Server {
    private ServerSocket serverSocket;
    private ExecutorService pool;
    public DataBase db;
    public Server(int port,int prevDb) {
        if(prevDb==1) {
            try {
                File file = new File("db.ser");
                if (file.exists()) {
                    System.out.println("Loading saved database");
                    FileInputStream fileIn = new FileInputStream(file);
                    ObjectInputStream in = new ObjectInputStream(fileIn);
                    this.db = (DataBase) in.readObject();
                    in.close();
                    fileIn.close();
                }
            } catch (Exception e) {
                System.err.println(e.toString());
            }
        }
        if (this.db == null) {
            System.out.println("Initializing new database");
            this.db = new DataBase(10);
        }
        String hostIp="127.0.0.1";
        try {
            this.serverSocket = new ServerSocket(port);
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

        new Thread(new Runnable() {
            @Override
            public void run() {
                Scanner userInput=new Scanner(new InputStreamReader(System.in));
                String line = userInput.nextLine();
                try{
                if(line.equalsIgnoreCase("over")){
                    FileOutputStream fileOut =
                            new FileOutputStream("db.ser");
                    ObjectOutputStream out = new ObjectOutputStream(fileOut);
                    out.writeObject(db);
                    out.close();
                    fileOut.close();
                }
                }catch (Exception e){
                    System.err.println(e.toString());
                }
                System.exit(1);
            }
        }).start();

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
        if(args[0].equalsIgnoreCase("new"))
            new Server(5000,0);
        else
            new Server(5000,1);
    }
}



