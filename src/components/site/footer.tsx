'use client' 

import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
  } from "@/components/ui/menubar"
import { useEffect, useState } from "react";
import { EditPreset } from "./editPreset";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertTriangle, Text } from "lucide-react";
import { useData } from "@/data/context";
import { toast } from "sonner";
import { backupData } from "@/data/actions";
import { AlertRestore } from "./alertRestore";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { RestoreFile } from "./restoreFile";

export const Footer = () => {
	const context = useData();
	const [closeRestore, setCloseRestore] = useState(false);
	const [menuValue, setMenuValue]	= useState("");

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
						setCloseRestore(!value)
						if (value) { setMenuValue("") }
				  }
					} />
	  		</Dialog>

	
			



			<MenubarSeparator />
			<MenubarSub>
			  <MenubarSubTrigger>Export</MenubarSubTrigger>
			  <MenubarSubContent>
				<MenubarItem>CSV</MenubarItem>
				<MenubarItem>PDF</MenubarItem>
				<MenubarItem>HTML</MenubarItem>
			  </MenubarSubContent>
			</MenubarSub>
			<MenubarSeparator />

			<MenubarItem className="text-red"><AlertTriangle className="mr-2 stroke-red-900" /> Reset</MenubarItem>
		  </MenubarContent>
		</MenubarMenu>
		<MenubarMenu>
		  <MenubarTrigger>About</MenubarTrigger>
		  <MenubarContent>
			<MenubarItem inset>About This App </MenubarItem>
			<MenubarSeparator />
			<MenubarItem inset>About drmsr</MenubarItem>
			<MenubarSeparator />
			<MenubarItem inset>Open Source</MenubarItem>
		  </MenubarContent>
		</MenubarMenu>
	  </Menubar>



	);
}
