import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Library } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";

const AlbumTabContent = () => {
  return (
    <Card className="mt-8">
        <CardHeader>
			<div className="flex items-center justify-between">
				<div>
					<CardTitle className="flex items-center gap-2">
						<Library className="size-5 text-emerald-500"/> <div className="text-white">Albums Library</div>
					</CardTitle>
					<CardDescription>Manage your album Collection</CardDescription>
				</div>
				<AddAlbumDialog />
			</div>
		</CardHeader>
			<CardContent>
				<AlbumsTable />
			</CardContent>
    </Card>
  )
}

export default AlbumTabContent;