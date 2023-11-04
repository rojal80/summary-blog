export default function binarySearch(sortedData, name) {
   let left = 0;
   let right = sortedData.length - 1;

   while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      let currentName = sortedData[mid].user.name;
      currentName = currentName.toLowerCase();

      if (currentName === name) {
         return sortedData[mid];
      } else if (currentName < name) {
         left = mid + 1;
      } else {
         right = mid - 1;
      }
   }

   return null; // Name not found in the sorted data
}

// Name to search for
// const nameToSearch = "Nischal Kadariya"; // Replace with the name you want to search

// // Perform binary search
// const result = binarySearch(sortedData, nameToSearch);

// // Check if the name was found
// if (result) {
//    console.log("Found:", result);
// } else {
//    console.log("Name not found in the sorted data.");
// }
