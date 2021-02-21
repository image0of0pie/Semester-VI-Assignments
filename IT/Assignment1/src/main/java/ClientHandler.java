import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.Socket;
class ClientHandler implements Runnable{
    private final Socket socket;
    public DataBase db;
    private DataInputStream input;
    private DataOutputStream out;
    private String username=null;

    public ClientHandler(Socket socket,DataBase db){
        this.socket=socket;
        this.db=db;
        try {
            input = new DataInputStream(
                    new BufferedInputStream(socket.getInputStream()));
            out=new DataOutputStream(socket.getOutputStream());
        }catch (Exception e){
            System.err.println(e.toString());
        }
    }
    @Override
    public void run() {
        String line;

        //authorize client
        try {
            line = input.readUTF();
            username=line;
            System.out.println("Connected to Server as "+username);
            out.writeUTF(db.authorize(username));
        }catch (Exception e){
            System.err.println(e.toString());
        }

        //process query
        while (true)
        {
            try
            {
                line = input.readUTF();
                if(line.charAt(0)=='\n'){
                    line=line.substring(1);
                }
                String[] tokens=line.split(" ");
                if(tokens[0].equalsIgnoreCase("Over")){
                    out.writeUTF("Session Terminated");
                    break;
                }
                switch (tokens[0]) {
                    case "get" -> {
                        if (tokens.length < 2) {
                            out.writeUTF("Key argument missing");
                        } else {
                            out.writeUTF(db.getValue(tokens[1], username));
                        }
                    }
                    case "put" -> {
                        if (tokens.length == 1) {
                            out.writeUTF("Missing key and value arguments");
                        } else if (tokens.length == 2) {
                            out.writeUTF("Missing value argument");
                        } else {
                            out.writeUTF(db.setValue(tokens[1], tokens[2], username));
                        }
                    }
                    case "upgrade" -> {
                        String gradationKey = "WhiteHatJr";
                        if (tokens.length == 1) {
                            out.writeUTF("Gradation key missing!!!");
                        } else if (!tokens[1].equals(gradationKey)) {
                            out.writeUTF("Incorrect gradation key!!!");
                        } else {
                            out.writeUTF(db.upgradeToManager(username));
                        }
                    }default -> {
                        out.writeUTF("Invalid request!!!");
                    }
                }
            }
            catch(Exception e)
            {
                System.err.println(e.toString());
                break;
            }
        }
        try{
            System.out.println("Session Terminated!!!");
            input.close();
            socket.close();
        }catch (Exception e){
            System.err.println(e.toString());
        }
    }
}
