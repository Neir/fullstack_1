package level_1;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import jsonhelper.JsonLoader;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.Function;

public class AchivementInPercentage {
    public JsonElement record(JsonObject jsonInput) {
        Gson gson = new Gson();
        Objective[] objectives = gson.fromJson(jsonInput.get("objectives"), Objective[].class);
        ProgressRecord[] progressRecords = gson.fromJson(jsonInput.get("progress_records"), ProgressRecord[].class);
        System.out.println("objective = " + objectives[0]);
        System.out.println("progressRecord = " + progressRecords[0]);
        ArrayList<Achivement> achivements = new ArrayList<>();
        Arrays.stream(objectives).forEach(objective -> {
                ProgressRecord progressRecord = Arrays.stream(progressRecords)
                        .filter(record -> record.getObjective_id() == objective.getId())
                        .findFirst()
                        .get();
                achivements.add(new Achivement(objective.getId(), calculProgress(objective, progressRecord)));
            });

        return gson.toJsonTree(gson.toJson(achivements.toArray()));
    }

    private int calculProgress(Objective objective, ProgressRecord progressRecord) {
        double progress = ((double) (progressRecord.getValue() - objective.getStart()) /
                (double) (objective.getTarget() - objective.getStart()))
                * 100;

        return (int) progress;
    }

    public static void main(String[] args) {
        String resourcesPath = new File("src/main/resources/level_1/data").getAbsolutePath();
        JsonObject input = new JsonLoader().loadFile(resourcesPath + "/input.json");
        System.out.println("input = " + input);

        JsonElement output = new AchivementInPercentage().record(input);
        System.out.println("output = " + output);

        JsonObject expectedOutput = new JsonLoader().loadFile(resourcesPath + "/expected_output.json");
        System.out.println("expectedOutput = " + expectedOutput);
    }
}
