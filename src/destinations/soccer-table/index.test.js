import { getLeageStats, giveScoreStatus } from "./data-manipulator";
import { data } from "../../data";

describe("soccer table data testing", () => {

    it("make sure data exits", () => {
        expect(data).toBeDefined();
    });

    it("test the function to get the each team data", () => {
         const mockedData = [
            {
                score: {
                  "Manchester United": 1,
                  "Leicester City": 2
                },
                date: "2021-05-04T14:00:00"
              },
         ];
        const mockedResult = getLeageStats(mockedData);
        const expectedResult = [
            {
                name: "Leicester City",
                won: 1,
                draw: 0,
                loss: 0,
                points: 3,
                goalsDifference: 1,
                playedGame: 1,
                fixtures: mockedData
            },
            {
                name: "Manchester United",
                won: 0,
                draw: 0,
                loss: 1,
                points: 0,
                goalsDifference: -1,
                playedGame: 1,
                fixtures: mockedData
            }

        ];
        expect(mockedResult).toEqual(expectedResult);
    });

    it("test if the team has lost the fixture", () => {
        const testingData = {
            "Manchester United": 1,
            "Leicester City": 2
        };
        const response = giveScoreStatus("Manchester United", "Leicester City", testingData);
        expect(response).toBe("loss");
    });

    it("test if the team has won the fixture", () => {
        const testingData = {
            "Manchester United": 2,
            "Leicester City": 1
        };
        const response = giveScoreStatus("Manchester United", "Leicester City", testingData);
        expect(response).toBe("won");
    });

    it("test if the team has drawn the fixture", () => {
        const testingData = {
            "Manchester United": 1,
            "Leicester City": 1
        };
        const response = giveScoreStatus("Manchester United", "Leicester City", testingData);
        expect(response).toBe("draw");
    });


    it("test if the team has nullified the fixture", () => {
        const testingData = {
            "Manchester United": null,
            "Leicester City": null
        };
        const response = giveScoreStatus("Manchester United", "Leicester City", testingData);
        expect(response).toBeNull();
    });


})