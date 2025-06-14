import { ContentLayout } from "@/components/admin-panel/content-layout";
import SavedResources from "./_components/saved-resources";

export default function Saved() {
  return (
    <ContentLayout title="Saved Resources">
      <SavedResources />
    </ContentLayout>
  );
}
