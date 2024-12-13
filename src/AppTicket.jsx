// import "./App.css";
import * as XLSX from "xlsx";
import { format, getTime, parse } from "date-fns"; // Importing for date formatting
import { FixedSizeList as List } from "react-window";

import React, { useEffect, useState, useMemo } from "react";


import TanstackReactTable from "./TanstackReactTable";
import TanstackReactTableResizing from "./TanstackReactTableResizing";

const keywords = ["high", "critical", "urgent", "important", "emergency"];
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("historyTickets");
  const [firstLevelTab, setFirstLevelTab] = useState("yesterday");
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [data, setData] = useState({
    yesterday: [],
    dayBeforeYesterday: [],
    threeDaysAgo: [],
  });
  //const [searchText,setSearchText] = useState('Lex');


  // const handleChange = (e) =>{
  //   setSearchText(e.target.value);
  //   //setData(data.filter((ele,idx)=> Object.values(ele).toLowerCase().includes(searchText.toLowerCase())));
  //   // return data[firstLevelTab].filter((ele,idx)=>{
  //   //   return ele.toLowerCase().includes(searchText.toLowerCase());
  //   // })
  // }
  const chunkSize = 10000;

  const handleFileUpload = (event, tabName) => {
    if (loadingProgress !== 0) {
      setLoadingProgress(0);
    }
    const file = event.target.files[0];
    const reader = new FileReader();

    setLoading(true);

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData = jsonData.map((row) => ({
        ...row,
        ...(row.Opened && { Opened : excelSerialToDate(row.Opened)}),
        ...(row.Updated && { Updated : excelSerialToDate(row.Updated)}),
        ...(row.Resolved && { Resolved : excelSerialToDate(row.Resolved)}),
        //...(row.Date && { Date: formatDate(row.Date) }),
        //...(row.Duration && { Duration: formatTime(row.Duration) }),
      }));

      // setData((prevData) => ({
      //   ...prevData,
      //   [tabName]: jsonData,
      // }));
      // setLoading(false);

      // chunk the data

      //console.log("JSON DATA", jsonData);
      processChunks(jsonData, tabName);
    };

    reader.readAsArrayBuffer(file);
  };

  const processChunks = (jsonData, tabName) => {
    const chunks = [];

    //  console.log(now)
    //const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    //return date.toLocaleDateString();

    // break data into chunks
    //console.time("Creating Chunks");

    for (let i = 0; i < jsonData.length; i += chunkSize) {
      const chunk = jsonData.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
   // console.timeEnd("Creating Chunks");
    //console.log("chunks data", chunks, chunks.length);

    const processChunk = (index) => {
      if (index >= chunks.length) {
        setLoading(false);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        [tabName]: [...prevData[tabName], ...chunks[index]],
      }));
      //console.log("index", index);
      //setLoadProgress((index / chunks.length) * 100);
      setLoadingProgress(Math.round((index / chunks.length) * 100000) / 1000);
      //console.log("%progress : ", loadProgress);
      // continue processing next chunk
      setTimeout(() => processChunk(index + 1), 1000); // use a small chunk to unblock UI
    };

    processChunk(0); // start processing first chunk
  };

  const excelSerialToDate = (serial) => {
    
    const excelStartDate = new Date(Date.UTC(1899,11,30));
    const millisecondsPerDay = 24*60*60*1000;

    const date = new Date(excelStartDate.getTime() + serial*millisecondsPerDay);
    //console.log(serial,date);
    return date.toLocaleDateString();
  }

  const formatDateTime = (dateTimeString) => {
    console.log(dateTimeString,dateTimeString.toLocaleDateString,dateTimeString.toLocaleTimeString);
    const [datePart, timePart] = dateTimeString.split(' ');
    
    // Format Date
    const [day, month, year] = datePart.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toLocaleDateString();
  
    // Format Time
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  
    return { formattedDate, formattedTime };
  };

  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  };

  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Row renderer function for react-window
  const Row = ({ index, style }) => {
    const row = data[firstLevelTab][index];
    return (
      <div style={style} className="flex">
        {Object.values(row).map((val, idx) => (
          <div
            key={idx}
            className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
          >
            {val}
          </div>
        ))}
      </div>
    );
  };

  const columnHeaders = data[firstLevelTab].length
    ? Object.keys(data[firstLevelTab][0])
    : [];

  const groupWorkNotesByDate = (workNotesString) => {
    const workNotes = [];
    const regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g; // Regex to match the timestamp
    let matches;
    let currentIndex = 0;

    //console.log("check before", workNotesString);
    // Loop through each match (each timestamp)
    while ((matches = regex.exec(workNotesString)) !== null) {
      // Capture the first note before the first timestamp (if it's the first iteration)
      if (currentIndex === 0 && matches.index !== 0) {
        workNotes.push(workNotesString.substring(0, matches.index).trim());
      }

      // Push the previous note into the array (from the last match to current match)
      if (currentIndex !== 0) {
        workNotes.push(
          workNotesString.substring(currentIndex, matches.index).trim()
        );
      }
      // Update currentIndex to start at this match
      currentIndex = matches.index;
    }

    // Push the final note after the last timestamp
    workNotes.push(workNotesString.substring(currentIndex).trim());
    //console.log("check 0", workNotes);

    // Group the notes by date
    // Group the notes by date
    const notesByDate = {};
    workNotes.forEach((note) => {
      const date = note.match(/\d{4}-\d{2}-\d{2}/)?.[0]; // Extract only the date part
      const content = note.replace(
        /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} - /,
        ""
      ); // Remove the timestamp from the content
      if (date) {
        if (!notesByDate[date]) {
          notesByDate[date] = [];
        }
        notesByDate[date].push(content); // Group notes by date
      }
    });
    //console.log("check 1", notesByDate);

    // Concatenate notes for each date in the desired format
    const formattedNotesByDate = {};
    Object.keys(notesByDate).forEach((date) => {
      formattedNotesByDate[date] = `${date} :\n` + notesByDate[date].join("\n"); // Date followed by notes on new lines
    });

    return formattedNotesByDate;
  };

  const groupAdditionalCommentsByDate = (addlCommentsString) => {
    const addlComments = [];
    const regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g; // Regex to match the timestamp
    let matches;
    let currentIndex = 0;

    //console.log("check before", workNotesString);
    // Loop through each match (each timestamp)
    while ((matches = regex.exec(addlCommentsString)) !== null) {
      // Capture the first note before the first timestamp (if it's the first iteration)
      if (currentIndex === 0 && matches.index !== 0) {
        addlComments.push(addlCommentsString.substring(0, matches.index).trim());
      }

      // Push the previous note into the array (from the last match to current match)
      if (currentIndex !== 0) {
        addlComments.push(
          addlCommentsString.substring(currentIndex, matches.index).trim()
        );
      }
      // Update currentIndex to start at this match
      currentIndex = matches.index;
    }

    // Push the final note after the last timestamp
    addlComments.push(addlCommentsString.substring(currentIndex).trim());
    //console.log("check 0", workNotes);

    // Group the notes by date
    // Group the notes by date
    const commentsByDate = {};
    addlComments.forEach((note) => {
      const date = note.match(/\d{4}-\d{2}-\d{2}/)?.[0]; // Extract only the date part
      const content = note.replace(
        /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} - /,
        ""
      ); // Remove the timestamp from the content
      if (date) {
        if (!commentsByDate[date]) {
          commentsByDate[date] = [];
        }
        commentsByDate[date].push(content); // Group notes by date
      }
    });
    //console.log("check 1", notesByDate);

    // Concatenate notes for each date in the desired format
    const formattedNotesByDate = {};
    Object.keys(commentsByDate).forEach((date) => {
      formattedNotesByDate[date] = `${date} :\n` + commentsByDate[date].join("\n"); // Date followed by notes on new lines
    });

    return formattedNotesByDate;
  };

  const modifiedData = data[firstLevelTab].map((ele, idx) => {
    // const criticalElements = ele["Priority"] === "1 - Critical";
    // const highElements = ele["Priority"] === "2 - High";
    // const foundHighElements = keywords.some((eachKeyword) => {
    //   return ele["Description"]
    //     .toLowerCase()
    //     .includes(eachKeyword.toLowerCase());
    // });

    // Extract text till the first newline, if it exists
    const firstNewLineIndex = ele["Description"].indexOf("\n");

    if (firstNewLineIndex !== -1) {
      ele["Short Description"] = ele["Description"].substring(
        0,
        firstNewLineIndex
      );
    }

    // Handle the case where description starts with "Short description:"
    const substringSearch = "Short description:";
    if (ele["Description"].startsWith(substringSearch)) {
      // Strip the description starting from index 18 (after "Short description:") till the first newline
      ele["Short Desc"] = ele["Description"].substring(
        18,
        // if there is new line or not equal to -1 then strip till first new line ,
        // if there is no new line or equal to -1 then strip till whole length.
        firstNewLineIndex !== -1 ? firstNewLineIndex : ele["Description"].length
      );
      //console.log("check 0", ele["Short Description"]);
    }

    // Group Work Notes by date and concatenate them for each day in the required format
    // console.log("check 4", ele["Work notes"]);
    let workNoteDate = null;
    let addlCommentsDate = null;
    let groupedWorkNotes = null;
    let groupedAddlComments = null;

    if (ele["Work notes"]) {
      groupedWorkNotes = groupWorkNotesByDate(ele["Work notes"]);

      // Get the latest date and its concatenated work notes
      workNoteDate = Object.keys(groupedWorkNotes).sort(
        (a, b) => new Date(b) - new Date(a)
      )[0];
      ele["Latest Note"] = groupedWorkNotes[workNoteDate]; // Add the latest work note to the element
    }

    // Group Addl Comments by date and concatenate them for each day in the required format
    // console.log("check 4", ele["Work notes"]);
    if (ele["Additional comments"]) {
      //const groupedWorkNotes = groupWorkNotesByDate(ele["Work notes"]);
      groupedAddlComments = groupAdditionalCommentsByDate(ele["Additional comments"]);

      // Get the latest date and its concatenated work notes
      addlCommentsDate = Object.keys(groupedAddlComments).sort(
        (a, b) => new Date(b) - new Date(a)
      )[0];
      ele["Latest Comments"] = groupedAddlComments[addlCommentsDate]; // Add the latest work note to the element
    }

    if (new Date(addlCommentsDate) >= new Date(workNoteDate)) {
      //console.log(groupedAddlComments)
      // if(groupedAddlComments === null){
      //   ele["Final Comments"] = groupedWorkNotes[workNoteDate];
      // }
      // else{
      // If Latest Comments date is greater than or equal to Latest Note date, set Final Comments
      //ele["Final Comments"] = groupedAddlComments[addlCommentsDate] ?? "Not Found";
      ele["Final Comments"] = "Better check manually, not found "; //groupedAddlComments[addlCommentsDate]; //(groupedAddlComments === null) ? `Not Found in Comments. But Latest Note as below : ${groupedAddlComments[workNoteDate]}` : groupedAddlComments[addlCommentsDate];
    
      //}
    } else {
      // Otherwise, set Final Comments to Latest Note
      ele["Final Comments"] = groupedWorkNotes[workNoteDate];
    }

    return ele;
    //return true; //criticalElements || highElements || foundHighElements;
  });

  // const highPriorityData = highPriorityDataInitial.map((ele, idx) => {
  //   // Modify the filtered array by stripping the description till the first new line
  //   const firstNewLineIndex = ele["Description"].indexOf("\n");

  //   if (firstNewLineIndex !== -1) {
  //     ele["Short Desc"] = ele["Description"].substring(
  //       18,
  //       firstNewLineIndex
  //     );
  //   }
  //   return ele;
  // });

  return (
    <div>
      <div className="flex space-x-4 mb-4 ml-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "historyTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("historyTickets")}
        >
          History Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "todayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("todayTickets")}
        >
          Today's Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "analysis" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("analysis")}
        >
          Ticket Analysis
        </button>
      </div>
      {activeTab === "historyTickets" && (
        <>
          <div className="flex flex-start ml-2">
            <div className="flex flex-col space-y-2 p-2">
              <button
                className={`px-4 py-2 font-semibold ${
                  firstLevelTab === "yesterday"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200"
                } rounded-md`}
                onClick={() => setFirstLevelTab("yesterday")}
              >
                Yesterday
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  firstLevelTab === "dayBeforeYesterday"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200"
                } rounded-md`}
                onClick={() => setFirstLevelTab("dayBeforeYesterday")}
              >
                Day Before Yesterday
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  firstLevelTab === "threeDaysAgo"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200"
                } rounded-md`}
                onClick={() => setFirstLevelTab("threeDaysAgo")}
              >
                3 Days Ago
              </button>
            </div>
            {firstLevelTab === "yesterday" && (
              <>
                <div className="flex flex-col w-[80%]">
                  <div className="mx-2 my-2">
                    {/* File Upload */}
                    <div>
                      <h2 className="text-md font-semibold mb-4">
                        Yesterday Upload Excel File
                      </h2>
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={(e) => handleFileUpload(e, firstLevelTab)}
                        className="mb-2 p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    {/*loading in Progress*/}
                    {loading && (
                      <div className="text-center my-4">
                        <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>

                        <p>
                          Loading Yesterday data, please wait...
                          {loadingProgress}%
                        </p>
                        {/* )} */}
                      </div>
                    )}

                    {/* Display Table with react-window */}
                    {!loading && data[firstLevelTab].length > 0 && (
                      <div className="flex flex-col justify-start mt-4">
                        <h3 className="text-md font-semibold mb-3">
                          Yesterday Excel Data:
                        </h3>
                        {/* Render the column headers */}
                        <div className="flex border-b bg-gray-100">
                          {columnHeaders.map((header, idx) => (
                            <div
                              key={idx}
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </div>
                          ))}
                        </div>
                        <List
                          height={400}
                          itemCount={data[firstLevelTab].length}
                          itemSize={50}
                          width={"100%"}
                          className="border rounded-lg"
                        >
                          {Row}
                        </List>
                      </div>
                    )}

                    {/* <TanstackReactTable myData={data[firstLevelTab]} /> */}

                    <TanstackReactTableResizing 
                    //myData={data[firstLevelTab]} 
                    myData={modifiedData}
                    //handleChange={handleChange} 
                    //searchText={searchText} 
                    
                    />
                  </div>
                </div>
              </>
            )}

            {firstLevelTab === "dayBeforeYesterday" && (
              <>
                <div className="flex flex-col w-[80%]">
                  <div className="mx-2 my-2">
                    {/* File Upload */}
                    <div>
                      <h2 className="text-md font-semibold mb-4">
                        Day Before Yesterday Upload Excel File
                      </h2>
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={(e) => handleFileUpload(e, firstLevelTab)}
                        className="mb-2 p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    {/*loading in Progress*/}
                    {loading && (
                      <div className="text-center my-4">
                        <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>

                        <p>
                          Loading Day Before Yesterday data, please wait...
                          {loadingProgress}%
                        </p>
                        {/* )} */}
                      </div>
                    )}

                    {/* Display Table with react-window */}
                    {!loading && data[firstLevelTab].length > 0 && (
                      <div className="flex flex-col justify-start mt-4">
                        <h3 className="text-md font-semibold mb-3">
                          Day Before Yesterday Excel Data:
                        </h3>
                        <List
                          height={400}
                          itemCount={data[firstLevelTab].length}
                          itemSize={50}
                          width={"100%"}
                          className="border rounded-lg"
                        >
                          {Row}
                        </List>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {activeTab === "todayTickets" && (
        <>
          <div className="ml-4">
            <p> This is today ticket tab</p>
          </div>
        </>
      )}

      {activeTab === "analysis" && (
        <>
          <div className="ml-4">
            <p>Analysis</p>
          </div>
        </>
      )}
    </div>
  );
};

function AppTicket() {
  return (
    <>
      <div className="mt-4">
        <h1>Tickets</h1>
        <Tabs />
      </div>
    </>
  );
}

export default AppTicket;
