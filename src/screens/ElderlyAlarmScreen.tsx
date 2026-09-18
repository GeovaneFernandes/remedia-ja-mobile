import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/tokens';
import { confirmDoseAndCancelAlarms } from '../lib/notifications';

// Tela de alarme mostrada ao idoso. Um único botão gigante — nada de menu,
// nada de navegação secundária. Ver ui-designer: acessibilidade vem antes
// de qualquer clichê visual de "app moderno".
type Props = {
  doseLogId: string;
  medicationName: string;
  dosage: string;
  scheduledIdentifiers: string[];
  onConfirmed: () => void;
};

export function ElderlyAlarmScreen({ doseLogId, medicationName, dosage, scheduledIdentifiers, onConfirmed }: Props) {
  const [confirming, setConfirming] = React.useState(false);

  async function handleConfirm() {
    setConfirming(true);
    try {
      await confirmDoseAndCancelAlarms(doseLogId, scheduledIdentifiers);
      onConfirmed();
    } finally {
      setConfirming(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hora do remédio</Text>
      <Text style={styles.medication}>{medicationName}</Text>
      <Text style={styles.dosage}>{dosage}</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Já tomei o remédio"
        onPress={handleConfirm}
        disabled={confirming}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>{confirming ? 'Confirmando...' : 'Já tomei ✓'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(3),
  },
  title: { fontSize: fontSizes.alarmTitle, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing(2) },
  medication: { fontSize: fontSizes.title, color: colors.brand, fontWeight: '600' },
  dosage: { fontSize: fontSizes.body, color: colors.textSecondary, marginBottom: spacing(5) },
  button: {
    backgroundColor: colors.brand,
    paddingVertical: spacing(4),
    paddingHorizontal: spacing(6),
    borderRadius: 16,
    minWidth: 260,
    alignItems: 'center',
  },
  buttonPressed: { backgroundColor: colors.brandDark },
  buttonText: { color: '#FFFFFF', fontSize: fontSizes.title, fontWeight: '700' },
});
