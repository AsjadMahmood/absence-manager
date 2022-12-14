import { fireEvent, render, screen } from "@testing-library/react";
import { AbsenceList } from "../AbsenceList";
import { AbsenceFilter } from "../AbsenceFilter";
import { FilterableAbsenceList } from "../FilterableAbsenceList";
import { vi} from "vitest";


const mockAbsenceFilterHandler = vi.fn();

const mockAbsenceList: any = [{
  admitterNote: "", confirmedAt: "2022-09-08",
  createdAt: "2022-09-07", endDate: "2022-09-13", id: 2351, memberImage: "https://loremflickr.com/300/400",
  memberName: "Mike", memberNote: "", rejectedAt: null, startDate: "2022-09-10", type: "sickness", userId: 2664
},{
  admitterNote: "", confirmedAt: "2020-12-12",
  createdAt: "2020-12-12", endDate: "2021-01-13", id: 2521, memberImage: "https://loremflickr.com/300/400",
  memberName: "Mike", memberNote: "", rejectedAt: null, startDate: "2021-01-13", type: "vacation", userId: 2664
}];

const mockFilter: any = { type: null, absenceStartDate: '', absenceEndDate: '' };


describe('Testing and Filtering Absence List', () => {

  it("should show user message on empty list", async () => {
    render(<AbsenceList absenceList={[]} absenceFilter={mockFilter}>
      <AbsenceFilter absenceFilter={mockFilter} handleAbsenceFilterType={mockAbsenceFilterHandler}
        handleAbsencePeriodFilter={mockAbsenceFilterHandler} />
    </AbsenceList>);
    const userMessage = await screen.findByAltText(/no data found/i);
    expect(userMessage).toBeInTheDocument();
  });

  it("should render correct number of absence list items", async () => {
    render(<AbsenceList absenceList={mockAbsenceList} absenceFilter={mockFilter}>
      <AbsenceFilter absenceFilter={mockFilter} handleAbsenceFilterType={mockAbsenceFilterHandler}
        handleAbsencePeriodFilter={mockAbsenceFilterHandler} />
    </AbsenceList>);
    const texts = await screen.findAllByTestId("absence-list");
    expect(texts.length).toBe(2);
  });

  it("should apply Absence Type  Filter correctly", async () => {
    render(<AbsenceList absenceList={mockAbsenceList} absenceFilter={mockFilter}>
      <AbsenceFilter absenceFilter={mockFilter} handleAbsenceFilterType={mockAbsenceFilterHandler}
        handleAbsencePeriodFilter={mockAbsenceFilterHandler} />
    </AbsenceList>);
    const chipElement = await screen.findByText("Absence Type");
    fireEvent.click(chipElement);
    const filterOtionElement = await screen.findByText("Sickness");
    fireEvent.click(filterOtionElement);
    const absenceTypeLabel = await screen.findAllByText("Sickness");
    expect(absenceTypeLabel.length).toBe(1);
  });

  it("on request failure, should show user friendly message", async () => {
    render(<FilterableAbsenceList />);
    const userMessage = await screen.findByAltText(/something went wrong/i);
    expect(userMessage).toBeInTheDocument();
  });


})