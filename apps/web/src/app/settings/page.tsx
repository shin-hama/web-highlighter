import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@whl/ui/components/ui/card";

import { getLabels } from "~/lib/labels";
import LabelsForm from "./_components/LabelsForm";

const Settings = async () => {
  console.log("settings");
  const labels = await getLabels();

  return (
    <div className="whl-container whl-flex whl-flex-col whl-gap-4 whl-py-8">
      <Card>
        <CardHeader>
          <CardTitle>Labels</CardTitle>
          <CardDescription>
            Set labels information for highlighting the text
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LabelsForm labels={labels} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
