import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.Socket;
import java.util.Scanner;

public class Client {

    public Socket socket;
    public DataInputStream input;
    public Scanner userInput;
    public DataOutputStream out;
    public String  userName;
    public Client(String address,int port,String userName) {
        try {
            socket = new Socket(address, port);
            input=new DataInputStream(new BufferedInputStream(socket.getInputStream()));
            out=new DataOutputStream(socket.getOutputStream());
            userInput=new Scanner(new InputStreamReader(System.in));
            this.userName=userName;
        }catch (Exception e) {
            System.err.println(e.toString());
        }
    }
    public void handleSocket(){
        String line;
        //authorize yourself
        try{
            out.writeUTF(userName);
            line=input.readUTF();
            System.out.println(line);
        }catch (Exception e){
            System.err.println(e.toString());
        }

        // keep reading until "Over" is input
        while (true)
        {
            line = userInput.nextLine();
            try
            {
                out.writeUTF(line);
                if(line.equalsIgnoreCase("over")){
                    break;
                }
            }
            catch(Exception e)
            {
                System.out.println(e.toString());
            }
            try{
                line=input.readUTF();
                System.out.println(line);
            }catch (Exception e){
                System.err.println(e.toString());
                break;
            }
        }

        //close connection
        try{
            socket.close();
            input.close();
            userInput.close();
            out.close();
        }catch (Exception e){
            System.err.println(e.toString());
        }
    }
    public static void main(String[] args) {
        new Client(args[0],Integer.parseInt(args[1]),args[2]).handleSocket();
    }
}
