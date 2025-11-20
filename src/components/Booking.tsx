import React, { useMemo, useState } from "react";

interface Layout {
  rows: number;
  seatsPerRow: number;
  aislePosition: number;
}

interface SeatType {
  name: string;
  price: number;
  rows: number[];
}

interface SeatTypes {
  [key: string]: SeatType;
}

interface BookingProps {
  layout?: Layout;
  seatType?: SeatTypes;
  bookedSeats?: number[];
  currency?: string;
  onBookingComplete?: () => {};
  title?: string;
  subtitle?: string;
}

export default function Booking({
  layout = {
    rows: 8,
    seatsPerRow: 12,
    aislePosition: 5,
  },
  seatType = {
    regular: { name: "Regular", price: 150, rows: [0, 1, 2] },
    premium: { name: "Premium", price: 250, rows: [0, 1, 2] },
    vip: { name: "VIP", price: 350, rows: [6, 7] },
  },

  bookedSeats = [],
  currency = "$",
  onBookingComplete,
  title = "Cinema Booking hall",
  subtitle = "Telugu",
}: BookingProps) { 

  const colors = [
    "blue", 
    "purple",
    "yellow",
    "green",
    "red",
    "indigo",
    "pink",
    "gray"
  ]







  const getSeatType = (row : any) => {
    const seatTypeEntires =  Object.entries(seatType)

    for (let i = 0; i < seatTypeEntires.length; i++){
      const [type, config] = seatTypeEntires[i]

      if(config.rows.includes(row)){

        const colors : any = colors[ i % colors.length] 
        return {type, colors, ...config}

      }
    }

    const [firstType, firstConfig] = seatTypeEntires[0]
    return {type : firstType, colors : colors[0], ...firstConfig}


  };

  const initializeSeats = useMemo(() => {
    const seats = [];
    for (let row = 0; row < layout.rows; row++) {
      const seatRow = [];
      const seatTypeInfo = getSeatType(row);

      for (let seat = 0; seat < layout.seatsPerRow; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
        seatRow.push({
          id: seatId,
          row,
          seat,
          type:seatTypeInfo?.type || "regular",
          color:seatTypeInfo?.color || "blue",
          price : seatTypeInfo.price || 150,
          status : bookedSeats.includes(seatId),
          selected: false,
        });
      }

      seats.push(seatRow);
    }

    return seats;
  }, [layout, seatType, bookedSeats]);

  const [seats, setSeats] = useState(initializeSeats);
  const [selectedSeats, setSelectedSeats] = useState([])


  const getColorClass = (colorName) => {

    const colorMap : any = {
      blue: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
      purple: "bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200",
      yellow: "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200",
      green: "bg-green-100 border-green-300 text-green-800 hover:bg-green-200",
      red: "bg-red-100 border-red-300 text-red-800 hover:bg-red-200",
      indigo: "bg-indigo-100 border-indigo-300 text-indigo-800 hover:bg-indigo-200",
      pink: "bg-pink-100 border-pink-300 text-pink-800 hover:bg-pink-200",
      gray: "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200",
    };  
    
    return colorMap[colorName] || colorMap.blue

  
  }


  }


  const handleSeatClick = (rowIndex, seatIndex) => {

  }

  const getSeatClassName = (seat) => {
    const baseClass =  "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-t border-2 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:test-xs font-bold border border-blue-300 bg-blue-100 text-blue-800";

    //more conditions

    if(seat.status === "booked"){
      return `${baseClass} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed`
    }

    if(seat.selected) {
      return `${baseClass} bg-green-500 border-green-600 text-white transform scale-110`
    }

    return `${baseClass} ${getColorClass(seat.color)}`




  };

  const renderSeatSection = (
    seatRow: any,
    startIndex: number,
    endIndex: number
  ) => {
    return (
      <div className="flex">
        {seatRow.slice(startIndex, endIndex).map((seat, index) => {
          return (
            <div 
              className={getSeatClassName(seat)} 
              key={seat.id} 
              onClick={() => handleSeatClick(seat.row, startIndex + index)}
              >
              {startIndex + index + 1}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {/* ttile */}
      <div className="w-full min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg p-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800">
            {title}
          </h1>
          <p className="text-center text-gray-600 mb-6">{subtitle}</p>
        </div>

        {/* screen */}

        <div className="mb-8">
          <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-400  rounded-full to-gray-300 mb-2 shadow-inner" />
          <p className="text-center text-sm text-grey-500 font-medium">
            Screen
          </p>
        </div>

        {/* seatmap */}

        <div className="mb-6 overflow-x-auto">
          <div className="flex flex-col items-center min-w-max">
            {seats.map((row, rowIndex) => {
              return (
                <div className="flex items-center mb-2" key={rowIndex}>
                  <span className="w-8 text-center font-bold text-gray-600 mr-4">
                    {String.fromCharCode(65 + rowIndex)}
                  </span>

                  {renderSeatSection(row, 0, layout.aislePosition)}

                  {/* aisle */}

                  <div className="w-8"></div>

                  {renderSeatSection(
                    row,
                    layout.aislePosition,
                    layout.seatsPerRow
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
