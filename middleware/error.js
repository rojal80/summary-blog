import { NextResponse } from "next/server";
export default function error(err) {
   switch (err.code) {
      case 11000:
         return NextResponse.json(
            { error: "Duplicate field value entered" },
            { status: 400 }
         );
   }
}
