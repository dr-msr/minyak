'use client' 

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/ui/menubar";

import { useEffect, useState } from "react";
import { useData } from "@/data/context";
import { backupData, exportCSV, exportHTML } from "@/data/actions";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { RestoreFile } from "../footer_dialog/restoreFile";
import { EditPreset } from "../footer_dialog/editPreset";
import { toast } from "sonner";
import { ResetData } from "../footer_dialog/resetData";
import { AboutApp } from "../footer_dialog/about";
import { AboutDRMSR } from "../footer_dialog/drmsr";
import { OpenSource } from "../footer_dialog/openSource";


export const Footer = () => {
	const context = useData();
	const [closeRestore, setCloseRestore] = useState(false);
	const [closeReset, setCloseReset] = useState(false);
	const [menuValue, setMenuValue]	= useState("");
	const [closeAbout, setCloseAbout] = useState(false);

	async function initBackup() {
		let payload = localStorage.getItem('data');
		if (!payload) {
			toast.error("No data found in local storage.");
			return
		};

		const result = backupData(payload);
		if (result.status == "SUCCESS") {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	}

	async function initCSV() {
		let payload = localStorage.getItem('data');
		if (!payload) {
			toast.error("No data found in local storage.");
			return
		};

		const result = exportCSV(payload);
		if (result.status == "SUCCESS") {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}		
	}

	async function initHTML() {
		let payload = localStorage.getItem('data');
		if (!payload) {
			toast.error("No data found in local storage.");
			return
		};

		const result = exportHTML(payload);
		if (result.status == "SUCCESS") {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}		
	}



	useEffect(() => {
		if (closeReset) {
			context.initData();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[closeReset])

	return (


		<Menubar className="min-w-[400px] justify-center mt-2" value={menuValue} onValueChange={(value) => setMenuValue(value)}>
			<MenubarMenu>
				<MenubarTrigger>Setting</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Unit Preference</MenubarItem>
					<MenubarRadioGroup value={context.data.Setting.unit}
						onValueChange={(e: string) => context.updateUnit(e)}>
						<MenubarRadioItem value="RM">RM</MenubarRadioItem>
						<MenubarRadioItem value="L">Litre</MenubarRadioItem>
					</MenubarRadioGroup>
					<MenubarSeparator />

					<MenubarItem>Petrol Preference</MenubarItem>
					<MenubarRadioGroup value={context.data.Setting.ron}
						onValueChange={(e: string) => context.updateRon(e)}>
						<MenubarRadioItem value="RON95">RON95</MenubarRadioItem>
						<MenubarRadioItem value="RON97">RON97</MenubarRadioItem>
					</MenubarRadioGroup>
					<MenubarSeparator />

					<Dialog>
						<DialogTrigger asChild>
							<MenubarItem onSelect={(e) => e.preventDefault()}>
								Edit Preset
							</MenubarItem>
						</DialogTrigger>
						<EditPreset />
					</Dialog>

				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Data</MenubarTrigger>
				<MenubarContent>
					<MenubarItem onClick={() => initBackup()}>
						Backup
					</MenubarItem>

					<Dialog open={closeRestore} onOpenChange={setCloseRestore}>
						<DialogTrigger asChild>
							<MenubarItem onSelect={(e) => e.preventDefault()}>
								Restore
							</MenubarItem>
						</DialogTrigger>
						<RestoreFile close={(value) => {
							setCloseRestore(!value);
							if (value) { setMenuValue(""); }
						} } />
					</Dialog>


					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger>Export</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem onClick={() => initCSV()}>CSV</MenubarItem>
							<MenubarItem onClick={() => initHTML()}>HTML</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSeparator />

					<Dialog open={closeReset} onOpenChange={setCloseReset}>
						<DialogTrigger asChild>
							<MenubarItem onSelect={(e) => e.preventDefault()} className="text-red">
								<AlertTriangle className="mr-2 stroke-red-900" /> Reset
							</MenubarItem>
						</DialogTrigger>
						<ResetData success={(value) => {
							setCloseReset(!value);
							if (value) {
								setMenuValue("");
							}
						} } />
					</Dialog>



				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>About</MenubarTrigger>
				<MenubarContent>
					<Dialog>
						<DialogTrigger asChild>
							<MenubarItem inset onSelect={(e) => e.preventDefault()}>
							About This App 
							</MenubarItem>
						</DialogTrigger>
						<AboutApp />
					</Dialog>

					<MenubarSeparator />

					<Dialog>
						<DialogTrigger asChild>
							<MenubarItem inset onSelect={(e) => e.preventDefault()}>
							About drmsr.dev 
							</MenubarItem>
						</DialogTrigger>
						<AboutDRMSR />
					</Dialog>
					
					<MenubarSeparator />

					<Dialog>
						<DialogTrigger asChild>
							<MenubarItem inset onSelect={(e) => e.preventDefault()}>
							Open Source 
							</MenubarItem>
						</DialogTrigger>
						<OpenSource />
					</Dialog>

				</MenubarContent>
			</MenubarMenu>
		</Menubar>



	);
}
