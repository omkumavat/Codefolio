import React from "react"

const PlatformComparisonDisplay3 = ({candidate1,candidate2,metric}) => {
    return(
        <div className="items-center mb-4 mt-2">
        <div className="space-y-1">
          <div className="flex justify-between items-center py-2 border-t border-gray-200">
            <div className={`w-1/3 text-right text-sm transition-colors ${candidate1 > candidate2
              ? 'font-bold text-green-600 animate-bounce' : 'text-gray-700'}`}>
              {candidate1}
            </div>
            <div className="w-1/3 text-center text-sm font-medium text-gray-600">
              {metric}
            </div>
            <div className={`w-1/3 text-left text-sm transition-colors ${candidate1 < candidate2 ? 'font-bold text-green-600 animate-bounce' : 'text-gray-700'}`}>
              {candidate2}
            </div>
          </div>
        </div>
      </div>
    )
}

export default PlatformComparisonDisplay3;