package level_1;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class AchivementInPercentageTest {

//    {
//        "objectives": [
//        { "id": 1, "start": 0, "target": 50 },
//        { "id": 2, "start": 10, "target": 42 },
//        { "id": 3, "start": 20, "target": 0 }
//  ],
//        "progress_records": [
//        { "id": 1, "objective_id": 1, "value": 15 },
//        { "id": 2, "objective_id": 3, "value": 15 },
//        { "id": 3, "objective_id": 2, "value": 14 }
//  ]
//    }

    @Test
    public void should_record_30_of_progress_for_15_from_start_0_to_target_50() {
        JsonObject input = new JsonParser().parse("{\n" +
               "\"objectives\": [\n" +
                "        { \"id\": 1, \"start\": 0, \"target\": 50 }\n" +
                "],\n" +
                "\"progress_records\": [\n" +
                "        { \"id\": 1, \"objective_id\": 1, \"value\": 15 },\n" +
                "  ]\n" +
        "}").getAsJsonObject();

        JsonElement result = new AchivementInPercentage().record(input);

        JsonObject expectedOutput = new JsonParser()
                .parse("{ \"progress_records\": [{\"id\":1,\"progress\":30}] }")
                .getAsJsonObject();
        assertThat(result).isEqualTo(expectedOutput);
    }
}
