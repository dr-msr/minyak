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
import { defaultSetting } from "@/lib/defaults";
import { Setting } from "@/lib/types";
import { useEffect, useState } from "react";
import { EditPreset } from "./editPreset";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertTriangle, Text } from "lucide-react";
import { useData } from "@/data/context";

interface FooterProps {
	settingData : Setting
	loadSetting : () => void
}


export const Footer = () => {


	const context = useData();


	
	return (
		<Dialog>

		<Menubar className="min-w-[400px] justify-center mt-2">
		<MenubarMenu>
		  <MenubarTrigger>Setting</MenubarTrigger>
		  <MenubarContent>
		  <MenubarItem>Unit Preference</MenubarItem>
		  <MenubarRadioGroup value={context.data.Setting.unit} 
		  	onValueChange={(e) => context.updateUnit(e)}>
			  <MenubarRadioItem value="RM">RM</MenubarRadioItem>
			  <MenubarRadioItem value="L">Litre</MenubarRadioItem>
			</MenubarRadioGroup>
			<MenubarSeparator />

			<MenubarItem>Petrol Preference</MenubarItem>
		  <MenubarRadioGroup value={context.data.Setting.ron} 
		  		  	onValueChange={(e) => context.updateRon(e)}>
			  <MenubarRadioItem value="RON95">RON95</MenubarRadioItem>
			  <MenubarRadioItem value="RON97">RON97</MenubarRadioItem>
			</MenubarRadioGroup>
			<MenubarSeparator />
      <DialogTrigger asChild>
	  		<MenubarItem>
			  	Edit Preset
			</MenubarItem>
      </DialogTrigger>
		  </MenubarContent>
		</MenubarMenu>
		<MenubarMenu>
		  <MenubarTrigger>Data</MenubarTrigger>
		  <MenubarContent>
			<MenubarItem>
			  Backup <MenubarShortcut>⌘Z</MenubarShortcut>
			</MenubarItem>
			<MenubarItem>
			  Restore <MenubarShortcut>⇧⌘Z</MenubarShortcut>
			</MenubarItem>
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
		  <MenubarTrigger>View</MenubarTrigger>
		  <MenubarContent>
			<MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
			<MenubarCheckboxItem checked>
			  Always Show Full URLs
			</MenubarCheckboxItem>
			<MenubarSeparator />
			<MenubarItem inset>
			  Reload <MenubarShortcut>⌘R</MenubarShortcut>
			</MenubarItem>
			<MenubarItem disabled inset>
			  Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
			</MenubarItem>
			<MenubarSeparator />
			<MenubarItem inset>Toggle Fullscreen</MenubarItem>
			<MenubarSeparator />
			<MenubarItem inset>Hide Sidebar</MenubarItem>
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

	  <EditPreset />
	  </Dialog>

	);
}
