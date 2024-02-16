import { CardDemo } from "@/components/site/demo";
import { LogEntry } from "@/components/site/logEntry";

export default function Home() {
	return (
	  <main className="flex min-h-screen flex-col items-center justify-between p-24">
		  <div>
			<LogEntry />
		  </div>
	  </main>
	);
  }
  