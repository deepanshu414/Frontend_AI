"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelModifier = () => {
const [columns, setColumns] = useState([]);
const [data, setData] = useState([]);
const [capacityColumn, setCapacityColumn] = useState("");
const [selectedValue, setSelectedValue] = useState("");
const [startRange, setStartRange] = useState(0);
const [endRange, setEndRange] = useState(0);
const [rowCheck, setRowCheck] = useState(false);
const [secondColumn, setSecondColumn] = useState("");
const [secondValue, setSecondValue] = useState("");

const handleFileUpload = (e) => {
const file = e.target.files?.[0];
if (!file) return;

const reader = new FileReader();
reader.onload = (evt) => {
    const bstr = evt.target.result;
    const workbook = XLSX.read(bstr, { type: "binary" });
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];
    const jsonData = XLSX.utils.sheet_to_json(ws);
    const keys = Object.keys(jsonData[0]);

    const modifiedData = jsonData.map((row) => ({ SelectRow: false, ...row }));

    setData(modifiedData);
    setColumns(["SelectRow", ...keys]);
};
reader.readAsBinaryString(file);
};

const getUniqueValues = (column) => {
const values = data.map((row) => row[column]);
return [...new Set(values)];
};

const handleCheckboxChange = (index) => {
const newData = [...data];
newData[index].SelectRow = !newData[index].SelectRow;
setData(newData);
};

const handleSubmit = () => {
const updatedData = data.map((row) => {
    if (row.SelectRow && (!rowCheck || row[secondColumn] === secondValue)) {
    return {
        ...row,
        [capacityColumn]: Math.floor(Math.random() * (endRange - startRange + 1)) + startRange,
    };
    }
    return row;
});

setData(updatedData);

if (window.confirm("Can modify data and download Excel file?")) {
    const worksheet = XLSX.utils.json_to_sheet(updatedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "modified_excel.xlsx");
}
};

return (
<div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800">
    <header className="bg-indigo-700 text-white py-6 shadow-md">
    <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold"><button
                onClick={() => window.location.href = "/"}
                className="text-white text-2xl hover:text-gray-200 transform translate-x-[-100px]"
                title="Go back"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                >
                <path d="M10 19l-7-7 7-7v4h8v6h-8v4z" />
                </svg>
            </button>
            Excel Data Modifier</h1>
        <p className="text-indigo-100 text-sm mt-1">Upload, filter and modify Excel sheets easily</p>
    </div>
    </header>

    <main className="max-w-5xl mx-auto px-4 py-8">
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="space-y-2">
        <label className="block font-semibold">Upload Excel File:</label>
        <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        />
        </div>

        {columns.length > 0 && (
        <>
            <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label className="block font-semibold mb-1">Capacity Column:</label>
                <select
                className="w-full border px-3 py-2 rounded-md"
                value={capacityColumn}
                onChange={(e) => setCapacityColumn(e.target.value)}
                >
                <option value="">-- Select Column --</option>
                {columns.map(
                    (col) => col !== "SelectRow" && (
                    <option key={col} value={col}>
                        {col}
                    </option>
                    )
                )}
                </select>
            </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label className="block font-semibold mb-1">Start Range:</label>
                <input
                type="number"
                className="w-full border px-3 py-2 rounded-md"
                value={startRange}
                onChange={(e) => setStartRange(Number(e.target.value))}
                />
            </div>
            <div>
                <label className="block font-semibold mb-1">End Range:</label>
                <input
                type="number"
                className="w-full border px-3 py-2 rounded-md"
                value={endRange}
                onChange={(e) => setEndRange(Number(e.target.value))}
                />
            </div>
            </div>

            <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                className="accent-indigo-600"
                checked={rowCheck}
                onChange={(e) => setRowCheck(e.target.checked)}
            />
            <label className="font-medium">Enable 2nd Column Filter</label>
            </div>

            {rowCheck && (
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                <label className="block font-semibold mb-1">2nd Column:</label>
                <select
                    className="w-full border px-3 py-2 rounded-md"
                    value={secondColumn}
                    onChange={(e) => setSecondColumn(e.target.value)}
                >
                    <option value="">-- Select Column --</option>
                    {columns.map(
                    (col) => col !== "SelectRow" && (
                        <option key={col} value={col}>
                        {col}
                        </option>
                    )
                    )}
                </select>
                </div>

                {secondColumn && (
                <div>
                    <label className="block font-semibold mb-1">Value from 2nd Column:</label>
                    <select
                    className="w-full border px-3 py-2 rounded-md"
                    value={secondValue}
                    onChange={(e) => setSecondValue(e.target.value)}
                    >
                    <option value="">-- Select Value --</option>
                    {getUniqueValues(secondColumn).map((val, i) => (
                        <option key={i} value={val}>
                        {String(val)}
                        </option>
                    ))}
                    </select>
                </div>
                )}
            </div>
            )}

            <div className="pt-4">
            <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-transform hover:scale-105 shadow"
            >
                Modify & Download
            </button>
            </div>
        </>
        )}
    </div>

    {data.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Data Preview</h2>
        <div className="overflow-auto max-h-[300px] border rounded-md">
            <table className="min-w-full text-sm">
            <thead className="bg-slate-100 border-b">
                <tr>
                {columns.map((col) => (
                    <th key={col} className="text-left px-4 py-2 font-medium">
                    {col}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.slice(0, 20).map((row, i) => (
                <tr key={i} className="border-b hover:bg-slate-50">
                    {columns.map((col) => (
                    <td key={col} className="px-4 py-2 whitespace-nowrap">
                        {col === "SelectRow" ? (
                        <input
                            type="checkbox"
                            checked={row[col] || false}
                            onChange={() => handleCheckboxChange(i)}
                        />
                        ) : (
                        String(row[col] ?? "")
                        )}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    )}
    </main>
</div>
);
};

export default ExcelModifier;