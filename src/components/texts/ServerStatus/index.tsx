import React, {useEffect, useState} from "react";
import {healthCheck} from "../../../api/index.api";
import {Text, View} from "react-native";


export default function ServerStatus(): React.JSX.Element {
  const [health, setHealth] = useState<boolean | undefined>(undefined)

  function healthToString(): string {
    return health === true ? 'On ✅' : health === false ? 'Off ❌' : 'Checking... 🔎';
  }

  useEffect(() => {
    healthCheck()
      .then(r => setHealth(r.data?.success === true))
      .catch(() => setHealth(false))
  }, []);

  return (
    <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Server status: {healthToString()}</Text>
    </View>
  );
}