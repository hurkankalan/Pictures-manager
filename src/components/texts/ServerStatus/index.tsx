import React, {useEffect, useState} from "react";
import {healthCheck} from "../../../api/index.api";
import {Button, View} from "react-native";

export default function ServerStatus(): React.JSX.Element {
  const [health, setHealth] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    checkHealth();
  }, []);

  function checkHealth() {
    healthCheck()
      .then(r => setHealth(r.data?.success === true))
      .catch(() => setHealth(false))
  }

  function healthToString(): string {
    return health === true ? 'On ✅' : health === false ? 'Off ❌' : 'Checking... 🔎';
  }

  return (
    <View style={{height: 80, justifyContent: 'center', alignItems: 'center'}}>
      <Button title={`Server status: ${healthToString()}\nCheck again`} onPress={checkHealth}/>
    </View>
  );
}