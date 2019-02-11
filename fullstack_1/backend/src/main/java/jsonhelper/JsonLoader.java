package jsonhelper;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;

import java.io.FileNotFoundException;
import java.io.FileReader;

public class JsonLoader {
    public JsonObject loadFile(String filename) {
        Gson gson = new Gson();

        try {
            JsonReader jsonReader = new JsonReader(new FileReader(filename));
            return gson.fromJson(jsonReader, JsonObject.class);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("Error JsonLoader = " + e);
            return new JsonObject();
        }
    }
}
