<template>
	<div v-if="!self.isLoading.value && self.showGuardian.value">
		<urt-tooltip tooltip="Fale com o guardião" :top="50" :left="15">
			<div id="guardianMenu" class="urt__guardian" @click="self.openMenu()">
				<img :src="UrtGuadianIcon" alt="guardian menu action icon" />
			</div>
		</urt-tooltip>

		<urt-menu target="guardianMenu" @component-key="(k: string) => self.setMenuComponentKey(k)">
			<div class="urt__guardian__menu">
				<div class="urt__guardian__menu__top">
					<div class="urt__guardian__menu__top__title">
						<span>fale com o guardião da conta</span>

						<urt-tooltip class="urt__guardian__menu__guardianTooltip" :tooltip="guardianTooltipText" :top="30" :left="-60">
							<i class="material-symbols-outlined urt__guardian__menu__top__title--icon">help</i>
						</urt-tooltip>
					</div>

					<div class="urt__guardian__menu__profile">
						<img :src="self.guardian.value.avatarLink" alt="guardian photo" />

						<div class="urt__guardian__menu__profile__info">
							<span class="urt__guardian__menu__profile__info__name">
								{{ self.guardian.value.name }}
							</span>
							<span class="urt__guardian__menu__profile__info__email">
								{{ self.guardian.value.email }}
							</span>
						</div>
					</div>
				</div>

				<div class="urt__guardian__menu__options">
					<a :href="'mailto:'+self.guardian.value.email" target="_blank" class="urt__guardian__menu__options__item">
						<i class="material-symbols-outlined">mail</i>
						<span>Enviar e-mail</span>
					</a>

					<a href="https://wa.me/5540033317" target="_blank" class="urt__guardian__menu__options__item">
						<img :src="WhatsAppIcon" alt="whatsapp icon" />
						<span>Iniciar uma conversa no WhatsApp</span>
					</a>

					<a :href="self.guardian.value.hubspotMeetingUrl" target="_blank" class="urt__guardian__menu__options__item">
						<i class="material-symbols-outlined">calendar_today</i>
						<span>Agendar uma reunião</span>
					</a>
				</div>
			</div>
		</urt-menu>
	</div>

	<div v-if="self.isLoading.value" class="urt__guardian__loading" />
</template>

<script setup lang="ts">
import UrtTooltip from '../../pure/urt-tooltip/urt-tooltip.template.vue'
import UrtGuadianIcon from '../../../assets/icons/contact_phone.png'
import UrtMenu from '../../pure/urt-menu/urt-menu.template.vue'
import { UrtGuardianMenu } from './urt-guardian-menu.ts'
import WhatsAppIcon from '../../../assets/icons/whatsapp.png'
import { MakeXMLHttpRequestAdapter } from '../../../modules/Http/xml-http-request.adapter.ts'

const self = new UrtGuardianMenu(MakeXMLHttpRequestAdapter)

const guardianTooltipText = 'Esse Guardião é responsável pela conta da sua empresa, entendendo suas necessidades, ' +
	'fornecendo atendimento personalizado e acompanhando sua empresa de perto sempre que precisar.'
</script>

<style lang="scss" scoped>
@import './urt-guardian-menu.scss';
</style>
