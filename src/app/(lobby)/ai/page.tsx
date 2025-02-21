import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FeatureUnavailable } from "@/components/feature-unavailable";

export default function Ai() {
  return (
    <ContentLayout title="AI Recommendations">
      <FeatureUnavailable />
    </ContentLayout>
  );
}
