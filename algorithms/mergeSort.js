// Merge Sort function
export default function mergeSort(arr) {
   if (arr.length <= 1) {
      return arr;
   }

   const middle = Math.floor(arr.length / 2);
   const left = arr.slice(0, middle);
   const right = arr.slice(middle);

   return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
   let result = [];
   let leftIndex = 0;
   let rightIndex = 0;

   while (leftIndex < left.length && rightIndex < right.length) {
      if (
         left[leftIndex].user.name.localeCompare(right[rightIndex].user.name) <
         0
      ) {
         result.push(left[leftIndex]);
         leftIndex++;
      } else {
         result.push(right[rightIndex]);
         rightIndex++;
      }
   }

   return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Sample data
