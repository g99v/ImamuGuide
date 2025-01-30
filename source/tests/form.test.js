/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");

describe("Form Validation", () => {
  let form, source, destination, startDate, endDate, alertMock;

  beforeEach(() => {
    document.documentElement.innerHTML = html;
    require("../main.js");

    form = document.getElementById("weatherForm");
    source = document.getElementById("source");
    destination = document.getElementById("destination");
    startDate = document.getElementById("start_date");
    endDate = document.getElementById("end_date");

    alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    alertMock.mockRestore();
  });

  test("Shows error if fields are empty", () => {
    form.dispatchEvent(new Event("submit"));
    expect(alertMock).toHaveBeenCalledWith("Please fill in all fields.");
  });

  test("Shows error if end date is before start date", () => {
    source.value = "Riyadh";
    destination.value = "Jeddah";
    startDate.value = "2025-12-10";
    endDate.value = "2025-12-05";

    form.dispatchEvent(new Event("submit"));
    expect(alertMock).toHaveBeenCalledWith("End date must be after the start date.");
  });
});
