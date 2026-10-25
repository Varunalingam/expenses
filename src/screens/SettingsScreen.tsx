import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenWrapper } from '../components/layout';
import { Card, Icon } from '../components/ui';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../theme';
import type { MainTabScreenProps } from '../types/navigation';

export type SettingsScreenProps = MainTabScreenProps<'Settings'>;

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const handleOpenIcons8 = () => {
    Linking.openURL('https://icons8.com');
  };

  const handleOpenAntigravity = () => {
    Linking.openURL('https://antigravity.google');
  };

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Settings</Text>

        {/* User Profile Card */}
        <Card variant="flat" style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>VA</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Varun Alingam</Text>
            <Text style={styles.profileEmail}>varunalingam.v@gmail.com</Text>
          </View>
        </Card>

        {/* Preferences */}
        <Text style={styles.sectionHeader}>Preferences</Text>
        <Card variant="flat" style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Currency</Text>
            <Text style={styles.settingValue}>USD ($)</Text>
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Appearance</Text>
            <Text style={styles.settingValue}>System Default</Text>
          </View>
          <View style={[styles.settingRow, styles.noBorder]}>
            <Text style={styles.settingLabel}>App Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
        </Card>

        {/* Legal & Attribution (Icons8 & Google Antigravity) */}
        <Text style={styles.sectionHeader}>Attributions</Text>
        <Card variant="flat" style={styles.settingsCard}>
          <TouchableOpacity
            style={styles.attributionRow}
            activeOpacity={0.7}
            onPress={handleOpenIcons8}
          >
            <View style={styles.attributionLeft}>
              <View style={styles.iconCircle}>
                <Icon name="icons8" size={24} />
              </View>
              <View style={styles.attributionTextContainer}>
                <Text style={styles.attributionTitle}>Icons8</Text>
                <Text style={styles.attributionSubtitle}>
                  All visual iconography provided by icons8.com
                </Text>
              </View>
            </View>
            <Text style={styles.attributionLink}>Visit ↗</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.attributionRow}
            activeOpacity={0.7}
            onPress={handleOpenAntigravity}
          >
            <View style={styles.attributionLeft}>
              <View style={styles.iconCircle}>
                <Icon name="antigravity" size={24} />
              </View>
              <View style={styles.attributionTextContainer}>
                <Text style={styles.attributionTitle}>Google Antigravity</Text>
                <Text style={styles.attributionSubtitle}>
                  AI-powered development by antigravity.google
                </Text>
              </View>
            </View>
            <Text style={styles.attributionLink}>Visit ↗</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  screenTitle: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginVertical: spacing.md,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.textInverse,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.body,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  profileEmail: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  sectionHeader: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  settingsCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  settingLabel: {
    fontSize: fontSize.body,
    color: colors.textPrimary,
  },
  settingValue: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  attributionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attributionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attributionTextContainer: {
    flex: 1,
  },
  attributionTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  attributionSubtitle: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  attributionLink: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
});
