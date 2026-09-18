import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/tokens';

type Medication = { id: string; name: string; dosage: string; timesOfDay: string[] };

// Lista de remédios cadastrados pelo cuidador para um idoso.
export function CaregiverMedicationsScreen({
  medications,
  onAddNew,
}: {
  medications: Medication[];
  onAddNew: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remédios cadastrados</Text>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text style={styles.medDetail}>{item.dosage} — {item.timesOfDay.join(', ')}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum remédio cadastrado ainda.</Text>}
      />
      <Pressable style={styles.button} onPress={onAddNew}>
        <Text style={styles.buttonText}>+ Novo remédio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing(3), backgroundColor: colors.background },
  title: { fontSize: fontSizes.title, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing(2) },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing(2),
    marginBottom: spacing(1),
  },
  medName: { fontSize: fontSizes.label, fontWeight: '600', color: colors.textPrimary },
  medDetail: { fontSize: fontSizes.body - 2, color: colors.textSecondary },
  empty: { fontSize: fontSizes.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing(4) },
  button: { backgroundColor: colors.brand, borderRadius: 12, padding: spacing(2), alignItems: 'center', marginTop: spacing(2) },
  buttonText: { color: '#FFFFFF', fontSize: fontSizes.label, fontWeight: '600' },
});
