import {data} from "../../data";
import {getTeamFixtures} from "./data-manupulation";

describe("testing the team fixtures", ()=>{
    it("get team fixtures", ()=>{
        const mockedData = [
            {
                score: {
                  "Manchester United": 1,
                  "Leicester City": 2
                },
                date: "2021-05-04T14:00:00"
              },
        ];

        const expectedRes = [
            {
                fixture: mockedData,
                date: "2021-05-04T14:00:00"
            }
        ]

        const res = getTeamFixtures("Manchester United", mockedData);

        expect(res).toEqual(expectedRes);
    });
})