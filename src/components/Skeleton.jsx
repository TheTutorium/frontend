import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";

export default function Skeleton() {
  return (
    <Card className="animate-pulse mb-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center justify-between p-1">
          <div className="flex items-center">
            <div className="w-64 h-6 bg-gray-200 dark:bg-gray-800 rounded-sm"></div>
          </div>
          <div className="flex items-center">
            <div className="w-48 h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className=" space-y-2">
          <div className="w-64 h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
          <div className="w-10/12 h-4 bg-gray-200  dark:bg-gray-800 rounded"></div>
          <div className="w-10/12 h-4 bg-gray-200  dark:bg-gray-800 rounded"></div>
          <div className="w-96 h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between">
          <div className="w-32 h-8 bg-gray-200  dark:bg-gray-800 rounded mb-2"></div>
          <div className="w-32 h-8 bg-gray-200 dark:bg-gray-800  rounded"></div>
        </div>
      </CardFooter>
    </Card>
  );
}
