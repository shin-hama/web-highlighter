import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@whl/ui/components/ui/card";

import LabelsForm from "./_components/LabelsForm";

const Settings = () => {
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
          <LabelsForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
